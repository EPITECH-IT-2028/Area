//
//  SettingsView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import SwiftUI

struct SettingsView: View {
	@EnvironmentObject var authState: AuthState
	@State var wantToLogout: Bool = false
	@State var logoutError: AuthError?
	@State var showLogoutError: Bool = false
	var body: some View {
		VStack {
			NavigationStack {
				List {
					NavigationLink(destination: UpdateServerPathView()) {
						Text(LocalizedStringResource.settingsUpdateServerPathTitle)
							.foregroundStyle(Color.primary)
					}
					Button(
						LocalizedStringResource.settingsLogout,
						action: {
							wantToLogout = true
						}
					)
					.foregroundStyle(Color(.red))
					.alert(
						LocalizedStringResource.settingsWantToLogout,
						isPresented: $wantToLogout
					) {
						Button(
							LocalizedStringResource.settingsLogoutCancel,
							role: .cancel
						) {
							wantToLogout = false
						}
						Button(
							LocalizedStringResource.settingsLogoutConfirm,
							role: .destructive
						) {
							Task {
								do {
									try authState.logout()
								} catch let error as AuthError {
									logoutError = error
									showLogoutError = true
								}
							}
						}
					}
				}
			}
		}
		.alert(
			LocalizedStringResource.settingsErrorLogout,
			isPresented: $showLogoutError
		) {
			Button(Constants.ok, role: .cancel) {}
		} message: {
			if let error = logoutError {
				Text(error.localizedDescription)
			}
		}
	}
}

#Preview {
	SettingsView()
}
