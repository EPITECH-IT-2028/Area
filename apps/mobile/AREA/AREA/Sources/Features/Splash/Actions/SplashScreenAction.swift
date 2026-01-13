//
//  SplashScreenAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 08/12/2025.
//

import Foundation
import SimpleKeychain

struct SplashScreenAction {
	func call(store: ServiceStore) async throws -> Bool {
		return try await store.fetchServices()
	}
}
