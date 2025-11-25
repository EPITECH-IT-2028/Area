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
