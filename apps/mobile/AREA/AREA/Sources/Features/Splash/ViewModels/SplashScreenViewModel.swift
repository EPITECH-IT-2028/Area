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

	func retrieveServices(store: ServiceStore) async {
		do {
			self.isLoading = true
			let services = try await action.call(store: store)

			DispatchQueue.main.async {
				if !services {
					try? AuthState.shared.logout()
				}
				self.isLoading = false
			}
		} catch {
			print(error)
			try? AuthState.shared.logout()
		}
	}
}
