//
//  SplashScreenView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 28/11/2025.
//

import SwiftUI

struct SplashScreenView: View {
	var body: some View {
		ZStack {
			Color.black.ignoresSafeArea()
			Text("AREA")
				.font(.title)
				.foregroundStyle(Color.white)
				.accessibilityLabel("Application AREA")
		}
	}
}

#Preview {
	SplashScreenView()
}
