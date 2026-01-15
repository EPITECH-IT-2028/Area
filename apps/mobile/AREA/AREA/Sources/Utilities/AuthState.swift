//
//  AuthState.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 02/12/2025.
//

internal import Combine
import Foundation
import SimpleKeychain

class AuthState: ObservableObject {
	static let shared = AuthState()

	@Published var isAuthenticated: Bool = AuthState.isUserAuthenticated()

	static func isUserAuthenticated() -> Bool {
		(try? KeychainManager.shared.keychain.hasItem(
			forKey: Constants.keychainJWTKey
		)) == true
		// TO DO: GET ABOUT.JSON FILE TO CHECK IF TOKEN IS AVAILABLE
	}

	func authenticate(accessToken: String) throws {
		do {
			try KeychainManager.shared.keychain.set(
				accessToken,
				forKey: Constants.keychainJWTKey
			)
			isAuthenticated = true
		} catch {
			throw AuthError.keychainSetFailed
		}
	}

	func logout() throws {
		do {
			try KeychainManager.shared.keychain.deleteItem(
				forKey: Constants.keychainJWTKey
			)
			isAuthenticated = false
		} catch {
			throw AuthError.keychainDeleteFailed
		}
	}
}
