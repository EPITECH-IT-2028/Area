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
							do {
								try authState.logout()
							} catch let error {
								print(error)
							}
						}
					}
				}
			}
		}
	}
}

#Preview {
	SettingsView()
}
