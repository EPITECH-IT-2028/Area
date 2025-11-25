//
//  ResetPasswordView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 25/11/2025.
//

import SwiftUI

struct ResetPasswordView: View {
	@ObservedObject var viewModel: LoginViewModel

	var body: some View {
		VStack {
			Spacer()
			VStack {
				TextField(
					LocalizedStringResource.loginEmailToResetTitle,
					text: $viewModel.email
				)
				.autocapitalization(.none)
				.disableAutocorrection(true)
				.padding(.top, 20)

				Divider()

				SecureField(
					LocalizedStringResource.loginResetPasswordTitle,
					text: $viewModel.password
				)
				.padding(.top, 20)

				Divider()
			}
			Spacer()
			Button(
				action: {
					Task {

					}
				},
				label: {
					Text(LocalizedStringResource.loginResetButtonTitle)
						.font(.system(size: 24, weight: .bold, design: .default))
						.frame(maxWidth: .infinity, maxHeight: 60)
						.foregroundColor(Color.white)
						.background(Color.blue)
						.cornerRadius(10)
				}
			)
		}
		.padding(30)
	}
}

#Preview {
	ResetPasswordView(viewModel: LoginViewModel())
}
