//
//  HomeView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

import SimpleKeychain
import SwiftUI

struct HomeView: View {
	@EnvironmentObject var authState: AuthState
	var body: some View {
		NavigationStack {

		}.navigationTitle(LocalizedStringResource.homeTitle)
	}
}

#Preview {
	HomeView()
}
