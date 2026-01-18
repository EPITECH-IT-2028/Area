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

			Text(LocalizedStringResource.projectNameTitle)
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
				.foregroundStyle(Color.primary)

				Divider()

				SecureField(
					LocalizedStringResource.loginPasswordFieldTitle,
					text: $viewModel.password
				)
				.foregroundStyle(Color.primary)
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
					await viewModel.githubLogin()
				}
			}) {
				HStack {
					Image(systemName: "globe")
					Text(LocalizedStringResource.loginLoginWithGitHub)
				}
				.frame(maxWidth: .infinity)
				.padding()
				.background(Color.mainColor)
				.foregroundColor(.white)
				.cornerRadius(10)
			}
			.disabled(viewModel.githubAuthAction.isLoading)
			.opacity(viewModel.githubAuthAction.isLoading ? 0.6 : 1)

			Button(action: {
				Task {
					await viewModel.googleLogin()
				}
			}) {
				HStack {
					Image(systemName: "globe")
					Text(LocalizedStringResource.loginLoginWithGoogle)
				}
				.frame(maxWidth: .infinity)
				.padding()
				.background(Color.mainColor)
				.foregroundColor(.white)
				.cornerRadius(10)
			}
			.disabled(viewModel.googleAuthAction.isLoading)
			.opacity(viewModel.googleAuthAction.isLoading ? 0.6 : 1)

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
						.foregroundColor(Color.cardBackgroundColor)
						.background(Color.mainColor)
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
