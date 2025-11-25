//
//  ResetViewModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 25/11/2025.
//

internal import Combine
import Foundation

class ResetViewModel: ObservableObject {
	@Published var email: String
	@Published var password: String

	init(email: String = "", newPassword: String = "") {
		self.email = email
		self.password = newPassword
	}

	// TO DO: Implement func to reset password
}
