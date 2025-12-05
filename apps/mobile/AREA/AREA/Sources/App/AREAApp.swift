//
//  AREAApp.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 24/11/2025.
//

import Foundation
import GoogleSignIn
import SwiftData
import SwiftUI

@main
struct AREAApp: App {
	var body: some Scene {
		WindowGroup {
			ContentView()
				.environmentObject(AuthState.shared)
		}
	}
}
