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

	init() {}

	let clientID = APIConfig.shared?.GOOGLE_CLIENT_ID

	func signIn() {
		guard let presentingViewController = getRootViewController() else {
			errorMessage = "Impossible de trouver le view controller"
			return
		}

		guard let clientID = clientID else {
			errorMessage = "Le client ID est manquant"
			return
		}

		isLoading = true
		errorMessage = nil

		let config = GIDConfiguration(clientID: clientID)
		GIDSignIn.sharedInstance.configuration = config

		GIDSignIn.sharedInstance.signIn(withPresenting: presentingViewController) {
			[weak self] result, error in
			guard let self = self else { return }

			DispatchQueue.main.async {
				self.isLoading = false

				if let error = error {
					self.errorMessage =
						"Erreur de connexion: \(error.localizedDescription)"
					return
				}

				guard let user = result?.user,
					let idToken = user.idToken?.tokenString
				else {
					self.errorMessage = "Impossible de récupérer le token"
					return
				}
				self.sendTokenToBackend(idToken: idToken)
			}
		}
	}

	private func sendTokenToBackend(idToken: String) {
		let backendUrl = "http://localhost:8080/auth/google?plateform=mobile"
		guard let url = URL(string: backendUrl) else {
			errorMessage = "URL invalide"
			return
		}

		var request = URLRequest(url: url)
		request.httpMethod = "POST"
		request.setValue("application/json", forHTTPHeaderField: "Content-Type")

		let body: [String: Any] = ["idToken": idToken]
		request.httpBody = try? JSONSerialization.data(withJSONObject: body)

		isLoading = true

		URLSession.shared.dataTask(with: request) {
			[weak self] data, response, error in
			guard let self = self else { return }

			DispatchQueue.main.async {
				self.isLoading = false

				if let error = error {
					self.errorMessage = "Erreur réseau: \(error.localizedDescription)"
					return
				}

				guard let httpResponse = response as? HTTPURLResponse,
					(200...299).contains(httpResponse.statusCode)
				else {
					self.errorMessage = "Erreur serveur"
					return
				}

				if let data = data,
					let json = try? JSONSerialization.jsonObject(with: data)
						as? [String: Any]
				{
					if let token = json["token"] as? String {
						UserDefaults.standard.set(token, forKey: "authToken")
						self.isAuthenticated = true
					}
				}
			}
		}.resume()
	}

	func signOut() {
		GIDSignIn.sharedInstance.signOut()
		UserDefaults.standard.removeObject(forKey: "authToken")
		isAuthenticated = false
	}

	private func getRootViewController() -> UIViewController? {
		guard
			let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
			let rootViewController = scene.windows.first?.rootViewController
		else {
			return nil
		}
		return rootViewController
	}
}
