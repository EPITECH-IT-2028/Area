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

	var body: some Scene {
		WindowGroup {
			ContentView()
				.environmentObject(authState)
				.environmentObject(serviceStore)
				.onAppear {
					SDImageCodersManager.shared.addCoder(SDImageSVGCoder.shared)
				}
		}
	}
}
