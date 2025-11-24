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

	func login() {
		self.isLoggedIn = true
	    LoginAction(
	        parameters: LoginRequest(
	            username: username,
	            password: password
	        )
	    ).call { response in
	        DispatchQueue.main.async {
	            if response.success {
	                self.isLoggedIn = true
	            } else {
	                self.isLoggedIn = false
	                // Optionally: handle/display login error message here
	            }
	        }
	    }
	}
}
