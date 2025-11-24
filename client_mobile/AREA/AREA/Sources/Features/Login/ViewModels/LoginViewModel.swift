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
	
		init(username: String = "", password: String = "") {
			self.username = username
			self.password = password
		}

		func login() {
				_ = LoginAction(
						parameters: LoginRequest(
								username: username,
								password: password
						)
				).call() { _ in
					// Login successful, navigate to the Home screen
				}

				// Login successful → trigger navigation here
				// e.g., showHome = true
		}
}
