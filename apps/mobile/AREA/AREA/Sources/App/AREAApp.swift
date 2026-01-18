//
//  AREAApp.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 24/11/2025.
//

import Foundation
import GoogleSignIn
import SDWebImageSVGCoder
import SwiftData
import SwiftUI

@main
struct AREAApp: App {
	@StateObject private var serviceStore = ServiceStore.shared
	@StateObject private var authState = AuthState.shared
	@AppStorage("language") private var languageString = "fr"

	var body: some Scene {
		WindowGroup {
			ContentView()
				.environmentObject(authState)
				.environmentObject(serviceStore)
				.environment(\.locale, Locale(identifier: languageString))
				.onAppear {
					SDImageCodersManager.shared.addCoder(SDImageSVGCoder.shared)
				}
		}
	}
}
