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
	let simpleKeychain = SimpleKeychain()

	var body: some View {
		VStack {
			Spacer()
			VStack {
				TextField(
					LocalizedStringResource.loginEmailFieldTitle,
					text: $viewModel.email
				)
				.autocapitalization(.none)
				.disableAutocorrection(true)
				.padding(.top, 20)
				Divider()
				SecureField(
					LocalizedStringResource.loginPasswordFieldTitle,
					text: $viewModel.password
				)
				.padding(.top, 20)
				Divider()
				Button(
					action: {
						// TO DO: Reset password
					},
					label: {
						Text("Forgot password ?")
							.font(.system(size: 12, weight: .regular, design: .default))
					}
				)
			}
			Spacer()
			Button(
				action: {
					Task {
						await viewModel.login()
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
				if try simpleKeychain.hasItem(forKey: Constants.keychainJWTKey) {
					viewModel.isLoggedIn = true
				}
			} catch {
				// Handle error if needed, or ignore
			}
		}
	}
}

#Preview {
	LoginView(viewModel: LoginViewModel())
}
