//
//  Constants.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

import Foundation

struct Constants {
	// Name string for tabs
	static let homeString = "Home"
	static let servicesString = "Services"
	static let settingsString = "Settings"

	// Icon string for tabs
	static let homeIconString = "house"
	static let servicesIconString = "list.bullet"
	static let settingsIconString = "gear"

	// Port MAX/MIN
	static let portMin: UInt16 = 0
	static let portMax: UInt16 = 65535

	// Register password
	static let passwordMin: Int = 8

	// Splash screen animation duration
	static let splashScreenAnimationDuration: TimeInterval = 1.5

	// Server scheme
	static let httpString = "http"
	static let httpsString = "https"

	// Server paths
	static let loginServerPath = "/auth/login"
	static let registerServerPath = "/auth/register"
	static let getUserPath = "/users"
	static let githubOAuth2ServerPath = "http://localhost:8080/auth/github"
	static let googleOAuth2ServerPath = "http://localhost:8080/auth/google"

	// OAuth2 query items
	static let keyForOauth2 = "platform"
	static let valueForOauth2 = "mobile"

	// OAuth2 token string
	static let tokenString = "token"

	// OAuth2 Callback url
	static let callbackURLScheme = "AREA"

	// Keychain values
	static let keychainJWTKey = "jwt"

	// Confirm both language
	static let ok = "OK"

}
