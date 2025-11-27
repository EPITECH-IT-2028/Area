//
//  SettingsView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import SwiftUI

struct SettingsView: View {
	var body: some View {
		NavigationStack {
			List {
				NavigationLink(destination: UpdateServerPathView()) {
					Text(LocalizedStringResource.settingsUpdateServerPathTitle)
						.foregroundStyle(Color.primary)
				}
			}
		}
	}
}

#Preview {
	SettingsView()
}
