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

	func saveToken(_ token: String, for serviceName: String) throws {
		do {
			let key = "token_\(serviceName.lowercased())"
			try KeychainManager.shared.keychain.set(token, forKey: key)
		} catch {
			throw AuthError.keychainSetFailed
		}
	}

	func getAuthToken() -> String? {
		return try? KeychainManager.shared.keychain.string(
			forKey: Constants.keychainJWTKey
		)
	}

	func getToken(for serviceName: String) -> String? {
		let key = "token_\(serviceName.lowercased())"
		return try? KeychainManager.shared.keychain.string(forKey: key)
	}

	func deleteToken(for serviceName: String) {
		let key = "token_\(serviceName.lowercased())"
		try? KeychainManager.shared.keychain.deleteItem(forKey: key)
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
