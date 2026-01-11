//
//  HomepageCardView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 11/01/2026.
//

import SwiftUI

struct HomepageCardView: View {
	var item: HomepageCard
	var isSquare: Bool = true

	var body: some View {
		GeometryReader { geometry in
			VStack(alignment: .center, spacing: 5) {
				Spacer()

				Text(item.title)
					.font(.system(size: isSquare ? 20 : 24, weight: .bold))
					.foregroundStyle(.black)
					.multilineTextAlignment(.center)
					.padding(.horizontal, 5)
					.minimumScaleFactor(0.6)

				Text("\(item.number)")
					.font(.system(size: isSquare ? 50 : 60, weight: .heavy))
					.foregroundStyle(.black)

				Spacer()
			}
			.frame(width: geometry.size.width, height: geometry.size.height)
			.background(Color.white)
			.cornerRadius(20)
			.overlay(
				RoundedRectangle(cornerRadius: 20)
					.stroke(Color.black.opacity(0.1), lineWidth: 1)
			)
			.shadow(color: .black.opacity(0.05), radius: 5, x: 0, y: 2)
		}
		.aspectRatio(isSquare ? 1.0 : 2.2, contentMode: .fit)
	}
}
