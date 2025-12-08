//
//  SplashScreenViewModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 08/12/2025.
//

internal import Combine
import Foundation

class SplashScreenViewModel: ObservableObject {
	@Published var isLoading: Bool = true
	var action = SplashScreenAction()

	init() {

	}
	func isTokenValid() async {
		do {
			let isTokenValid = try await action.verifyToken()
			if !isTokenValid {
				try AuthState.shared.logout()
			} else {
			}
		} catch {
			print(error)
		}
	}
}
