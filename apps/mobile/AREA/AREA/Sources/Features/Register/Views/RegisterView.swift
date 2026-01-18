//
//  RegisterView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 28/11/2025.
//

import SimpleKeychain
import SwiftUI

struct RegisterView: View {
	@StateObject var viewModel: RegisterViewModel
	var onShowRegister: () -> Void

	var body: some View {
		VStack {

			Spacer()

			Text(LocalizedStringResource.projectNameTitle)
				.font(.titleFont)

			VStack {

				TextField(
					String(localized: LocalizedStringResource.registerNameFieldTitle),
					text: $viewModel.name
				)
				.autocapitalization(.none)
				.disableAutocorrection(true)
				.padding(.top, 20)
				.font(.defaultFont)
				.foregroundStyle(Color(.black))

				Divider()

				TextField(
					String(localized: LocalizedStringResource.registerEmailFieldTitle),
					text: $viewModel.email,
					onEditingChanged: { isChanged in
						if !isChanged {
							if viewModel.textFieldValidatorEmail(viewModel.email) {
								viewModel.emailValid = true
							} else {
								viewModel.emailValid = false
							}
						}
					}
				)
				.autocapitalization(.none)
				.disableAutocorrection(true)
				.padding(.top, 20)
				.font(.defaultFont)
				.foregroundStyle(!viewModel.emailValid ? Color(.red) : Color(.black))

				Divider()

				if !viewModel.emailValid {
					Text(LocalizedStringResource.registerEmailNotValid)
						.font(.callout)
						.foregroundColor(Color.red)
				}

				SecureField(
					String(localized: LocalizedStringResource.registerPasswordFieldTitle),
					text: $viewModel.password
				)
				.foregroundStyle(
					!viewModel.confirmPasswordValid || !viewModel.passwordValid
						? Color(.red) : Color(.black)
				)
				.padding(.top, 20)
				.font(.defaultFont)

				Divider()

				SecureField(
					String(
						localized: LocalizedStringResource
							.registerConfirmedPasswordFieldTitle
					),
					text: $viewModel.confirmPassword
				)
				.foregroundStyle(
					!viewModel.confirmPasswordValid || !viewModel.passwordValid
						? Color(.red) : Color(.black)
				)
				.padding(.top, 20)
				.font(.defaultFont)

				Divider()

			}

			if viewModel.status == .failure, let errorMessage = viewModel.errorMessage
			{
				Text(errorMessage)
					.font(.callout)
					.foregroundColor(Color.red)
			}

			Spacer()

			Button(
				action: {
					onShowRegister()
				},
				label: {
					Text(LocalizedStringResource.registerAlreadyHaveAccountTitle)
						.font(.system(size: 12, weight: .regular, design: .default))
				}
			)

			Button(
				action: {
					Task {
						do {
							try await viewModel.register()
						} catch {
							viewModel.status = .failure
							viewModel.errorMessage = error.localizedDescription
						}
					}
				},
				label: {
					Text(LocalizedStringResource.registerRegisterButtonTitle)
						.font(.system(size: 24, weight: .regular, design: .default))
						.frame(maxWidth: .infinity, maxHeight: 60)
						.foregroundColor(Color.white)
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
					viewModel.isRegister = true
				}
			} catch {
				print("\(LocalizedStringResource.errorRegisterViewOnAppear) \(error)")
			}
		}
	}
}
