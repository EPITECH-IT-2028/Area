//
//  UserDefaults.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 27/11/2025.
//

import Foundation

@propertyWrapper
struct UserDefault<T> {
	let key: String
	let defaultValue: T

	var wrappedValue: T {
		get { UserDefaults.standard.object(forKey: key) as? T ?? defaultValue }
		set { UserDefaults.standard.set(newValue, forKey: key) }
	}
}

struct SettingsUD {
	@UserDefault(key: "isDarkMode", defaultValue: false)
	static var isDarkMode: Bool

	@UserDefault(key: "serverScheme", defaultValue: "https")
	static var serverScheme: String

	@UserDefault(key: "serverHost", defaultValue: "api.coffeedevs.fr")
	static var serverHost: String

	@UserDefault(key: "serverPort", defaultValue: nil)
	static var serverPort: Int?
}
