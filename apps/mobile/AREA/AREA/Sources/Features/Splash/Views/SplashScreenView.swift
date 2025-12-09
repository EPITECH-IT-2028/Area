//
//  SplashScreenView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 28/11/2025.
//

import SwiftUI

struct SplashScreenView: View {
	@StateObject var viewModel = SplashScreenViewModel()
	var body: some View {
		ZStack {
			Color.black.ignoresSafeArea()
			Text(LocalizedStringResource.splashScreenTitle)
				.font(.title)
				.foregroundStyle(Color.white)
		}
		.onAppear {
			Task {
				await viewModel.isTokenValid()
			}
		}
	}
}

#Preview {
	SplashScreenView()
}
