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
	@State private var showSplash = true

	var body: some View {
		ZStack {
			if showSplash {
				SplashScreenView()
					.transition(.opacity)
					.animation(
						.easeOut(duration: Constants.splashScreenAnimationDuration),
						value: showSplash
					)
			} else {
				if (try? KeychainManager.shared.keychain.hasItem(
					forKey: Constants.keychainJWTKey
				))
					== true
				{
					TabView {
						Tab(Constants.homeString, systemImage: Constants.homeIconString) {
							HomeView()
						}
						Tab(
							Constants.servicesString,
							systemImage: Constants.servicesIconString
						) {
							ServicesView()
						}
						Tab(
							Constants.settingsString,
							systemImage: Constants.settingsIconString
						) {
							SettingsView()
						}
					}
				} else {
					LoginView(viewModel: viewModel)
				}
			}
		}
		.onAppear {
			DispatchQueue.main.asyncAfter(
				deadline: .now() + Constants.splashScreenAnimationDuration
			) {
				withAnimation {
					self.showSplash = false
				}
			}
		}
	}
}

#Preview {
	ContentView()
}
