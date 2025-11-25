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
	let simpleKeychain = SimpleKeychain()

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
			await MainActor.run {
				isLoggedIn = true
				status = .success
			}
			do {
				try simpleKeychain.set(
					response.accessToken,
					forKey: Constants.keychainJWTKey
				)
			} catch let error as SimpleKeychainError {
				print(error.localizedDescription)
			}
		} catch {
			await MainActor.run {
				errorMessage = error.localizedDescription
				status = .success
			}
			throw LoginError.invalidCredentials
		}
	}
}
