//
//  LoginView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import SwiftUI

struct LoginView: View {
		
//		@ObservedObject var viewModel: LoginViewModel = LoginViewModel()
		
		var body: some View {
				VStack {
						
						Spacer()
						
						VStack {
								TextField(
									LocalizedStringResource.loginUsernameFieldTitle,
									text: $viewModel.username
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
						}
						
						Spacer()
						
						Button(
//								action: viewModel.login,
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
		}
}

#Preview {
    LoginView()
}
