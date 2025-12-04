//
//  GoogleAuthService.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 03/12/2025.
//

internal import Combine
import Foundation
import GoogleSignIn
import SwiftUI

class GoogleAuthService: ObservableObject {
	@Published var isAuthenticated = false
	@Published var errorMessage: String?
	@Published var isLoading = false

	private let clientID = APIConfig.shared?.GOOGLE_CLIENT_ID

	init() {}

	/// Start the Google connexion flow client side, then send the token to the backend.
	@MainActor
	func signIn() async throws {
		guard let clientID = clientID else {
			self.errorMessage = String(
				localized: LocalizedStringResource.registerGoogleMissingConfigClientId
			)
			return
		}

		guard let rootViewController = getRootViewController() else {
			self.errorMessage = String(
				localized: LocalizedStringResource
					.registerGoogleMissingViewForGoogleConnexion
			)
			return
		}

		self.isLoading = true
		self.errorMessage = nil

		do {
			let config = GIDConfiguration(clientID: clientID)
			GIDSignIn.sharedInstance.configuration = config

			let result = try await GIDSignIn.sharedInstance.signIn(
				withPresenting: rootViewController
			)
			guard let idToken = result.user.idToken?.tokenString else {
				throw NSError(
					domain: "GoogleAuth",
					code: -1,
					userInfo: [
						NSLocalizedDescriptionKey: LocalizedStringResource
							.registerGoogleUnableToRetrieveIdToken
					]
				)
			}

			try await sendTokenToBackend(idToken: idToken)

		} catch {
			print("Google Sign-In Error: \(error.localizedDescription)")
			self.errorMessage = error.localizedDescription
			self.isAuthenticated = false
		}

		self.isLoading = false
	}

	/// Send the Google's ID Token to the backend to create a user session.
	private func sendTokenToBackend(idToken: String) async throws {
		let builder = BuilderAPI()
		let url = try builder.buildURL(path: Constants.googleOAuth2ServerPath)

		let request = try builder.buildRequest(
			url: url,
			method: "POST",
			parameters: GoogleServiceRequest(
				token: idToken
			)
		)

		let (data, urlResponse) = try await URLSession.shared.data(for: request)

		guard let response = urlResponse as? HTTPURLResponse else {
			throw NetworkError.badURLResponse(
				underlyingError: NSError(
					domain: "GoogleAuth",
					code: -1,
					userInfo: [
						NSLocalizedDescriptionKey: LocalizedStringResource
							.registerGoogleInvalidResponseFromServer
					]
				)
			)
		}

		guard (200...299).contains(response.statusCode) else {
			let errorMsg = parseErrorMessage(
				from: data,
				statusCode: response.statusCode
			)
			throw NSError(
				domain: "BackendAuth",
				code: response.statusCode,
				userInfo: [NSLocalizedDescriptionKey: errorMsg]
			)
		}

		let decoder = JSONDecoder()
		decoder.keyDecodingStrategy = .convertFromSnakeCase

		let loginResponse = try decoder.decode(LoginResponseData.self, from: data)

		if let accessToken = loginResponse.data?.accessToken {
			try AuthState.shared.authenticate(accessToken: accessToken)
			self.isAuthenticated = true
		} else {
			throw NetworkError.missingAccessToken
		}
	}

	private func getRootViewController() -> UIViewController? {
		guard
			let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
			let rootViewController = scene.windows.first?.rootViewController
		else {
			return nil
		}
		var currentController = rootViewController
		while let presented = currentController.presentedViewController {
			currentController = presented
		}
		return currentController
	}

	private func parseErrorMessage(from data: Data, statusCode: Int) -> String {
		if let json = try? JSONSerialization.jsonObject(with: data)
			as? [String: Any]
		{
			if let message = json["message"] as? String { return message }
			if let error = json["error"] as? String { return error }
		}
		return
			"\(LocalizedStringResource.registerGoogleInvalidResponseFromServer): \(statusCode)"
	}
}
