//
//  ContentView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

import SimpleKeychain
import SwiftUI

struct ContentView: View {
	@StateObject private var loginViewModel = LoginViewModel()
	@StateObject private var registerViewModel = RegisterViewModel()
	@State private var showSplash = true
	@State private var showingRegister = false
	private let fadeOutDuration: TimeInterval = 0.5

	private var isUserAuthenticated: Bool {
		(try? KeychainManager.shared.keychain.hasItem(
			forKey: Constants.keychainJWTKey
		)) == true
			|| (try? KeychainManager.shared.keychain.hasItem(
				forKey: Constants.keychainJWTKey
			)) == true
	}

	var body: some View {
		ZStack {
			if showSplash {
				SplashScreenView()
					.transition(.opacity)
					.animation(
						.easeOut(duration: fadeOutDuration),
						value: showSplash
					)
			} else {
				if isUserAuthenticated {
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
					if showingRegister {
						RegisterView(
							viewModel: registerViewModel,
							onShowRegister: { showingRegister = false }
						)
					} else {
						LoginView(
							viewModel: loginViewModel,
							onShowRegister: { showingRegister = true }
						)
					}
				}
			}
		}
		.onAppear {
			DispatchQueue.main.asyncAfter(
				deadline: .now()
					+ (Constants.splashScreenAnimationDuration - fadeOutDuration)
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
