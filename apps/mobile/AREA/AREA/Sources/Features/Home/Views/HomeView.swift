//
//  HomeView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

import SimpleKeychain
import SwiftUI

struct HomeView: View {
	var body: some View {
		Text("Home")
		#if DEBUG
			// Debug button to delete the keychain key for testing
			Button(
				action: {
					try? KeychainManager.shared.keychain.deleteItem(
						forKey: Constants.keychainJWTKey
					)
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
