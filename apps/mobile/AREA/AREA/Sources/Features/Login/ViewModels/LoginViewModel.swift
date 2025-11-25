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
	let simpleKeychain = SimpleKeychain()

	init(email: String = "", password: String = "") {
		self.email = email
		self.password = password
		self.isLoggedIn = false
	}

	func login() async {
		do {
			let response: LoginResponseData = try await LoginAction(
				parameters: LoginRequest(
					email: email,
					password: password
				)
			).call()
			isLoggedIn = true
			do {
				try simpleKeychain.set(
					response.access_token,
					forKey: Constants.keychainJWTKey
				)
			} catch let error as SimpleKeychainError {
				print(error.localizedDescription)
			}
		} catch {
			print(error)
		}
	}
}
