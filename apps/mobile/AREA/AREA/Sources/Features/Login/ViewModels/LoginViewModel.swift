//
//  LoginViewModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import Foundation
internal import Combine

class LoginViewModel: ObservableObject {
	@Published var username: String
	@Published var password: String
	@Published var isLoggedIn: Bool
	
		init(username: String = "", password: String = "") {
			self.username = username
			self.password = password
			self.isLoggedIn = false
		}

	func login() async {
		do {
			let _: LoginResponseData = try await LoginAction(
				parameters: LoginRequest(
					username: username,
					password: password
				)
			).call()
			isLoggedIn = true
		} catch {
			print(error)
		}
	}
}
