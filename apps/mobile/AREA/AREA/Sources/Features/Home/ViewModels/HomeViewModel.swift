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
	var action = HomeAction()

	func retrieveAREA() async -> [AREAItem] {
		do {
			self.isLoading = true
			let items: [AREAItem] = try await HomeAction().call()
			return items
		} catch {
			print(error)
			return []
		}
	}
}
