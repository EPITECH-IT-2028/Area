//
//  ContentView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

import GoogleSignIn
import SimpleKeychain
import SwiftUI

struct ContentView: View {
	@EnvironmentObject var authState: AuthState
	@EnvironmentObject var serviceStore: ServiceStore
	@StateObject private var loginViewModel = LoginViewModel()
	@StateObject private var registerViewModel = RegisterViewModel()
	@State private var showSplash = true
	@State private var showingRegister = false
	@State private var showError = false
	@State private var errorMessage = ""

	private let fadeOutDuration: TimeInterval = 0.5

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
				if authState.isAuthenticated {
					TabView {
						Tab(LocalizedStringResource.homeTitle, systemImage: Constants.homeIconString) {
							HomeView()
						}
						Tab(
							LocalizedStringResource.servicesTitle,
							systemImage: Constants.servicesIconString
						) {
							ServicesView()
						}
						Tab(
							LocalizedStringResource.settingsTitle,
							systemImage: Constants.settingsIconString
						) {
							SettingsView()
						}
					}.onAppear {
						Task {
							if serviceStore.services.isEmpty {
								do {
									_ = try await serviceStore.fetchServices()
								} catch {
									errorMessage = error.localizedDescription
									showError = true
								}
							}
						}
					}
					.alert(LocalizedStringResource.errorTitle, isPresented: $showError) {
						Button(LocalizedStringResource.tryAgainTitle) {
							Task {
								do {
									_ = try await serviceStore.fetchServices()
								} catch {
									errorMessage = error.localizedDescription
									showError = true
								}
							}
						}
						Button("OK", role: .cancel) {}
					} message: {
						Text(errorMessage)
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
		.onOpenURL { url in
			GIDSignIn.sharedInstance.handle(url)
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
		.environmentObject(AuthState.shared)
}
