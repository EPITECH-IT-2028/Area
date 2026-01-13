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
		if try await store.fetchServices() == false {
			return false
		}
		return true
	}
}
