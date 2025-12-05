//
//  HomeView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

import SimpleKeychain
import SwiftUI

struct HomeView: View {
	@EnvironmentObject var authState: AuthState
	var body: some View {
		Text("Home")
		#if DEBUG
			// Debug button to delete the keychain key for testing
			Button(
				action: {
					do {
						try authState.logout()
					} catch {
						print("Failed to logout")
					}
				},
				label: {
					Text("Suppr keychain")
				}
			)
		#endif
	}
}

#Preview {
	HomeView()
}
