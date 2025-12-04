//
//  LoginView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import SimpleKeychain
import SwiftUI

struct LoginView: View {
	@ObservedObject var viewModel: LoginViewModel
	var onShowRegister: () -> Void

	var body: some View {
		VStack {

			Spacer()

			Text("AREA")
				.font(.titleFont)

			VStack {

				TextField(
					LocalizedStringResource.loginEmailFieldTitle,
					text: $viewModel.email
				)
				.autocapitalization(.none)
				.disableAutocorrection(true)
				.padding(.top, 20)
				.font(.defaultFont)
				.foregroundStyle(Color(.black))

				Divider()

				SecureField(
					LocalizedStringResource.loginPasswordFieldTitle,
					text: $viewModel.password
				)
				.foregroundStyle(Color(.black))
				.padding(.top, 20)
				.font(.defaultFont)

				Divider()

				Button(
					action: {
						// TO DO: Reset password
					},
					label: {
						Text(LocalizedStringResource.loginForgotPasswordTitle)
							.font(.system(size: 12, weight: .regular, design: .default))
					}
				)

				if let errorMessage = viewModel.errorMessage {
					Text(errorMessage)
						.foregroundStyle(Color(.red))
						.padding(20)
						.font(.defaultFont)
				}

			}

			Spacer()

			Button(action: {
				Task {
					await viewModel.googleLogin()
				}
			}) {
				HStack {
					Image(systemName: "globe")
					Text("Se connecter avec Google")
				}
				.frame(maxWidth: .infinity)
				.padding()
				.background(Color.blue)
				.foregroundColor(.white)
				.cornerRadius(10)
			}
			.disabled(viewModel.authService.isLoading)
			.opacity(viewModel.authService.isLoading ? 0.6 : 1)

			Button(
				action: {
					onShowRegister()
				},
				label: {
					Text(LocalizedStringResource.loginNoAccountRegisterTitle)
						.font(.system(size: 12, weight: .regular, design: .default))
				}
			)

			Button(
				action: {
					Task {
						do {
							try await viewModel.login()
						} catch {
							viewModel.email = ""
							viewModel.password = ""
						}
					}
				},
				label: {
					Text(LocalizedStringResource.loginLoginButtonTitle)
						.font(.system(size: 24, weight: .bold, design: .default))
						.frame(maxWidth: .infinity, maxHeight: 60)
						.foregroundColor(Color.white)
						.background(Color.blue)
						.cornerRadius(10)
				}
			)

		}
		.padding(30)
		.onAppear {
			do {
				if try KeychainManager.shared.keychain.hasItem(
					forKey: Constants.keychainJWTKey
				) {
					viewModel.isLoggedIn = true
				}
			} catch {
				// Handle error if needed, or ignore
			}
		}
	}
}
