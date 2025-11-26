//
//  KeychainManager.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 26/11/2025.
//

import Foundation
import SimpleKeychain

class KeychainManager {
	static let shared = KeychainManager()
	let keychain = SimpleKeychain()

	private init() {}
}
