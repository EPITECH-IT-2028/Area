//
//  LoginViewModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

internal import Combine
import Foundation

class LoginViewModel: ObservableObject {
	@Published var email: String
	@Published var password: String
	@Published var isLoggedIn: Bool

	init(email: String = "", password: String = "") {
		self.email = email
		self.password = password
		self.isLoggedIn = false
	}

	func login() async {
		print("hello world")
		do {
			let _: LoginResponseData = try await LoginAction(
				parameters: LoginRequest(
					email: email,
					password: password
				)
			).call()
			isLoggedIn = true
		} catch {
			print(error)
		}
	}
	
//	func reset() async {
//		do {
//			let _ : ResetResponseData = try await ResetAction(
//				parameters: ResetRequest(
//					email: email,
//					password: password
//				).call()
//		} catch {
//			
//		}
//		}
//	}
}
