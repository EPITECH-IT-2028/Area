//
//  SplashScreenView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 28/11/2025.
//

import SwiftUI

struct SplashScreenView: View {
	@StateObject var viewModel = SplashScreenViewModel()
	@EnvironmentObject var serviceStore: ServiceStore
	var body: some View {
		ZStack {
			Color.mainColor.ignoresSafeArea()
			Text(LocalizedStringResource.splashScreenTitle)
				.font(.title)
				.foregroundStyle(Color.black)
		}
		.onAppear {
			Task {
				await viewModel.retrieveServices(store: serviceStore)
			}
		}
	}
}

#Preview {
	SplashScreenView()
}
