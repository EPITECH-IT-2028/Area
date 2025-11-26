//
//  LoginViewModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

internal import Combine
import Foundation
import SimpleKeychain

class LoginViewModel: ObservableObject {
	@Published var email: String
	@Published var password: String
	@Published var isLoggedIn: Bool
	@Published var errorMessage: String? = nil
	@Published var status: LoginStatus = .success

	enum LoginStatus {
		case success
		case failure
	}

	init(email: String = "", password: String = "") {
		self.email = email
		self.password = password
		self.isLoggedIn = false
	}

	@MainActor
	func login() async throws {
		do {
			let response: LoginResponseData = try await LoginAction(
				parameters: LoginRequest(
					email: email,
					password: password
				)
			).call()
			isLoggedIn = true
			status = .success
			errorMessage = nil
			guard let data = response.data else {
				throw NetworkError.missingResponseData
			}
			guard let accessToken = data.accessToken else {
				throw NetworkError.missingAccessToken
			}
			do {
				try KeychainManager.shared.keychain.set(
					accessToken,
					forKey: Constants.keychainJWTKey
				)
			} catch {
				print("Keychain error: \(error.localizedDescription)")
			}
		}
	}
}
