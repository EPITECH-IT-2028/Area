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

	// Splash screen animation duration
	static let splashScreenAnimationDuration: TimeInterval = 1.5

	// Server scheme
	static let httpString = "http"
	static let httpsString = "https"

	// Server paths
	static let loginServerPath = "/auth/login"
	static let registerServerPath = "/auth/register"

	// Keychain values
	static let keychainJWTKey = "jwt"

}
