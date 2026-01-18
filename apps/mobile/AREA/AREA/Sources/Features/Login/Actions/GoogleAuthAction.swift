//
//  GoogleAuthAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 05/12/2025.
//

internal import AuthenticationServices
internal import Combine
import Foundation
import UIKit

class GoogleAuthAction: NSObject, ObservableObject {
	@Published var isAuthenticated = false
	@Published var errorMessage: String?
	@Published var isLoading = false
	private var session: ASWebAuthenticationSession?

	override init() {
		super.init()
	}

	func signIn() async throws -> String {
		return try await withCheckedThrowingContinuation { continuation in
			DispatchQueue.main.async {
				self.isLoading = true
			}
			let fullURL = try? BuilderAPI().buildURL(path: Constants.googleOAuth2ServerPath)
			guard
				let url = fullURL,
				var components = URLComponents(url: url, resolvingAgainstBaseURL: true)
			else {
				DispatchQueue.main.async {
					self.errorMessage = "Invalid URL"
					self.isLoading = false
				}
				continuation.resume(
					throwing: NSError(
						domain: "GoogleAuthAction",
						code: -1,
						userInfo: [NSLocalizedDescriptionKey: "Invalid URL"]
					)
				)
				return
			}
			components.queryItems = [
				URLQueryItem(
					name: Constants.keyForOauth2,
					value: Constants.valueForOauth2
				)
			]

			guard let authURL = components.url else {
				DispatchQueue.main.async {
					self.errorMessage = "Invalid URL"
					self.isLoading = false
				}
				continuation.resume(
					throwing: NSError(
						domain: "GoogleAuthAction",
						code: -1,
						userInfo: [NSLocalizedDescriptionKey: "Invalid URL"]
					)
				)
				return
			}

			self.session = ASWebAuthenticationSession(
				url: authURL,
				callbackURLScheme: Constants.callbackURLScheme
			) { callbackURL, error in
				defer { self.session = nil }

				if let error = error {
					DispatchQueue.main.async {
						self.errorMessage = error.localizedDescription
						self.isLoading = false
					}
					continuation.resume(throwing: error)
					return
				}

				guard let callbackURL = callbackURL,
					let components = URLComponents(
						url: callbackURL,
						resolvingAgainstBaseURL: true
					),
					let tokenItem = components.queryItems?.first(where: {
						$0.name == Constants.tokenString
					}),
					let token = tokenItem.value
				else {
					DispatchQueue.main.async {
						self.errorMessage = "Missing token in callback URL"
						self.isLoading = false
					}
					continuation.resume(
						throwing: NSError(
							domain: "GoogleAuthAction",
							code: -2,
							userInfo: [
								NSLocalizedDescriptionKey: "Missing token in callback URL"
							]
						)
					)
					return
				}

				DispatchQueue.main.async {
					do {
						try AuthState.shared.authenticate(accessToken: token)
						self.isAuthenticated = true
						self.isLoading = false
						continuation.resume(returning: token)
					} catch {
						self.errorMessage = "Failed to save authentication"
						self.isLoading = false
						continuation.resume(
							throwing: NSError(
								domain: "GoogleAuthAction",
								code: -3,
								userInfo: [
									NSLocalizedDescriptionKey:
										"Failed to save authentication"
								]
							)
						)
					}
				}
			}
			self.session?.presentationContextProvider = self
			if self.session?.start() != true {
				DispatchQueue.main.async {
					self.errorMessage = "Failed to start authentication session"
					self.isLoading = false
				}
				continuation.resume(
					throwing: NSError(
						domain: "GoogleAuthAction",
						code: -4,
						userInfo: [
							NSLocalizedDescriptionKey:
								"Failed to start authentication session"
						]
					)
				)
			}
		}
	}
}

extension GoogleAuthAction: ASWebAuthenticationPresentationContextProviding {
	func presentationAnchor(for session: ASWebAuthenticationSession)
		-> ASPresentationAnchor
	{
		if let windowScene = UIApplication.shared.connectedScenes
			.compactMap({ $0 as? UIWindowScene })
			.first
		{
			return ASPresentationAnchor(windowScene: windowScene)
		}
		return ASPresentationAnchor()
	}
}
