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
	var authService = GoogleAuthService()

	enum LoginStatus {
		case success
		case failure
	}

	init(email: String = "", password: String = "") {
		self.email = email
		self.password = password
		self.isLoggedIn = false
	}

	func googleLogin() {
		authService.signIn()
		
		if (authService.isAuthenticated == true) {
			isLoggedIn = true
			status = .success
			errorMessage = nil
		}
	}
	
	@MainActor
	func login() async throws {
		let response: LoginResponseData = try await LoginAction(
			parameters: LoginRequest(
				email: email,
				password: password
			)
		).call()

		guard let data = response.data else {
			throw NetworkError.missingResponseData
		}
		guard let accessToken = data.accessToken else {
			throw NetworkError.missingAccessToken
		}
		do {
			try AuthState.shared.authenticate(accessToken: accessToken)
			isLoggedIn = true
			status = .success
			errorMessage = nil
			email = ""
			password = ""
		} catch {
			print("Keychain error: \(error.localizedDescription)")
			status = .failure
			errorMessage = error.localizedDescription
		}
	}
}
