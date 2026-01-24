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
	@Environment(\.colorScheme) var colorScheme

	var body: some View {
		GeometryReader { geometry in
			HStack(spacing: 0) {
				if geometry.size.width > 600 {
					ZStack(alignment: .topLeading) {
						Image("background")
							.resizable()
							.aspectRatio(contentMode: .fill)
							.frame(width: geometry.size.width * 0.45)
							.clipped()

						Color.black.opacity(0.4)
							.frame(width: geometry.size.width * 0.35)

						LinearGradient(
							gradient: Gradient(colors: [
								Color.clear,
								Color(.systemBackground),
							]),
							startPoint: .init(x: 0.8, y: 0.5),
							endPoint: .trailing
						)
						.frame(width: geometry.size.width * 0.45)

						VStack(alignment: .leading, spacing: 20) {
							Text("A WISE QUOTE")
								.font(.system(size: 12, weight: .medium))
								.foregroundColor(.white.opacity(0.8))
								.tracking(2)

							Spacer()

							VStack(alignment: .leading, spacing: 16) {
								Text("Believe in your journey")
									.font(.system(size: 30, weight: .bold))
									.foregroundColor(.white)

								Text(
									"Every step brings you closer to your goals when you stay focused and keep learning."
								)
								.font(.system(size: 16, weight: .regular))
								.foregroundColor(.white.opacity(0.9))
								.lineSpacing(4)
							}

							Spacer()
						}
						.padding(70)
					}
					.frame(width: geometry.size.width * 0.45)
				}
				ScrollView {
					VStack(spacing: 0) {
						Spacer()
							.frame(height: geometry.size.width > 600 ? 0 : 100)

						Image(
							colorScheme == .dark
								? "area-logo-white" : "area-logo-colorful"
						)
						.resizable()
						.aspectRatio(contentMode: .fit)
						.frame(height: 40)
						.padding(.bottom, 40)

						Text(LocalizedStringResource.loginWelcomeBackTitle)
							.font(.system(size: 36, weight: .bold))
							.foregroundColor(.primary)
							.padding(.bottom, 8)

						Text(LocalizedStringResource.loginEnterPasswordAndEmailTitle)
							.font(.system(size: 14, weight: .regular))
							.foregroundColor(.secondary)
							.multilineTextAlignment(.center)
							.padding(.bottom, 40)

						Spacer()

						VStack(alignment: .leading, spacing: 24) {
							VStack(alignment: .leading, spacing: 8) {
								Text(LocalizedStringResource.loginEmailFieldTitle)
									.font(.system(size: 14, weight: .medium))
									.foregroundColor(.primary)

								TextField(
									LocalizedStringResource.loginEnterYourEmailTitle,
									text: $viewModel.email
								)
								.autocapitalization(.none)
								.disableAutocorrection(true)
								.padding()
								.background(Color(.systemGray6))
								.cornerRadius(8)
								.font(.system(size: 15))
							}

							VStack(alignment: .leading, spacing: 8) {
								Text(LocalizedStringResource.loginPasswordFieldTitle)
									.font(.system(size: 14, weight: .medium))
									.foregroundColor(.primary)

								SecureField(
									LocalizedStringResource.loginEnterYourPasswordTitle,
									text: $viewModel.password
								)
								.padding()
								.background(Color(.systemGray6))
								.cornerRadius(8)
								.font(.system(size: 15))
							}

							if let errorMessage = viewModel.errorMessage {
								Text(errorMessage)
									.foregroundStyle(Color(.red))
									.font(.system(size: 13))
									.padding(.vertical, 8)
							}
						}
						.padding(.horizontal, geometry.size.width > 600 ? 80 : 30)

						Spacer()

						VStack(spacing: 20) {
							HStack {
								Text(LocalizedStringResource.loginNoAccountRegisterTitle)
									.font(.system(size: 14, weight: .regular))
									.foregroundColor(.secondary)
								Button(action: {
									onShowRegister()
								}) {
									Text(LocalizedStringResource.loginSignUpTitle)
										.font(.system(size: 14, weight: .semibold))
										.foregroundColor(.primary)
								}
							}

							HStack(spacing: 12) {
								Button(action: {
									Task {
										await viewModel.googleLogin()
									}
								}) {
									HStack(spacing: 8) {
										Image("google-logo")
											.resizable()
											.renderingMode(.original)
											.frame(width: 20, height: 20)
									}
									.frame(maxWidth: 50)
									.padding(.vertical, 14)
									.foregroundColor(.primary)
									.background(colorScheme == .dark ? Color.black : Color.white)
									.cornerRadius(8)
									.overlay(
										RoundedRectangle(cornerRadius: 8)
											.stroke(Color(.systemGray4), lineWidth: 1)
									)
								}
								.disabled(viewModel.googleAuthAction.isLoading)
								.opacity(viewModel.googleAuthAction.isLoading ? 0.6 : 1)

								Button(action: {
									Task {
										await viewModel.githubLogin()
									}
								}) {
									HStack(spacing: 8) {
										Image(
											colorScheme == .dark
												? "github-white-logo" : "github-black-logo"
										)
										.resizable()
										.frame(width: 20, height: 20)
									}
									.frame(maxWidth: 50)
									.padding(.vertical, 14)
									.foregroundColor(.primary)
									.background(colorScheme == .dark ? Color.black : Color.white)
									.cornerRadius(8)
									.overlay(
										RoundedRectangle(cornerRadius: 8)
											.stroke(Color(.systemGray4), lineWidth: 1)
									)
								}
								.disabled(viewModel.githubAuthAction.isLoading)
								.opacity(viewModel.githubAuthAction.isLoading ? 0.6 : 1)
							}

							Button(action: {
								Task {
									do {
										try await viewModel.login()
									} catch {
										viewModel.email = ""
										viewModel.password = ""
									}
								}
							}) {
								Text(LocalizedStringResource.loginLoginButtonTitle)
									.font(.system(size: 16, weight: .semibold))
									.frame(maxWidth: .infinity)
									.padding(.vertical, 16)
									.foregroundColor(.white)
									.background(Color(red: 0.45, green: 0.35, blue: 0.30))
									.cornerRadius(8)
							}
						}
						.padding(.horizontal, geometry.size.width > 600 ? 80 : 30)
						.padding(.bottom, 30)
					}
					.frame(minHeight: geometry.size.height)
				}
				.frame(
					width: geometry.size.width > 600
						? geometry.size.width * 0.55 : geometry.size.width
				)
				.background(Color(.systemBackground))
			}
		}
		.edgesIgnoringSafeArea(.all)
		.onAppear {
			do {
				if try KeychainManager.shared.keychain.hasItem(
					forKey: Constants.keychainJWTKey
				) {
					viewModel.isLoggedIn = true
				}
			} catch {}
		}
	}
}

#Preview {
	let viewModel: LoginViewModel = LoginViewModel()
	var showingRegister: Bool = false
	LoginView(viewModel: viewModel, onShowRegister: { showingRegister = true })
}
