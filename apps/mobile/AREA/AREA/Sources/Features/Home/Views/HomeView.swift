//
//  Dashboard.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

import SwiftUI
import SimpleKeychain

struct HomeView: View {
	var body: some View {
		Text("Home")
		// KEEP THIS BUTTON TO DELETE THE KEY IN KEYCHAIN AND RECONNECT TO TEST
		Button(action: {
			try? KeychainManager.shared.keychain.deleteItem(forKey: Constants.keychainJWTKey)
		}, label: {
			Text("Suppr keychain")
		})
	}
}

#Preview {
	HomeView()
}
