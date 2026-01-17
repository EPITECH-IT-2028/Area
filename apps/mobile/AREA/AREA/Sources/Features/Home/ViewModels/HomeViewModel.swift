//
//  HomeViewModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/01/2026.
//

internal import Combine
import Foundation

class HomeViewModel: ObservableObject {
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
