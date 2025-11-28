//
//  ContentView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

import SimpleKeychain
import SwiftUI

struct ContentView: View {
	@StateObject private var viewModel = LoginViewModel()

	var body: some View {
		if (try? KeychainManager.shared.keychain.hasItem(
			forKey: Constants.keychainJWTKey
		))
			== true
		{
			TabView {
				Tab(Constants.homeString, systemImage: Constants.homeIconString) {
					HomeView()
				}
				Tab(Constants.servicesString, systemImage: Constants.servicesIconString)
				{
					ServicesView()
				}
				Tab(Constants.settingsString, systemImage: Constants.settingsIconString)
				{
					SettingsView()
				}
			}
		} else {
			LoginView(viewModel: viewModel)
		}

	}
}

#Preview {
	ContentView()
}
