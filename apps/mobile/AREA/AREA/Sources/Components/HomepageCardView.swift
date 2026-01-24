//
//  HomepageCardView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 11/01/2026.
//

import SwiftUI

struct HomepageCardView: View {
	var card: HomepageCard
	var isSquare: Bool = true
	@Environment(\.colorScheme) var colorScheme

	var body: some View {
		HStack(spacing: 16) {
			ZStack {
				RoundedRectangle(cornerRadius: 16)
					.fill(card.backgroundColor.opacity(0.15))
					.frame(width: 60, height: 60)

				Image(systemName: card.iconName)
					.font(.system(size: 24, weight: .semibold))
					.foregroundColor(card.iconColor)
			}

			VStack(alignment: .leading, spacing: 4) {
				Text(card.title)
					.font(.system(size: 15, weight: .regular))
					.foregroundColor(.secondary)
					.lineLimit(1)

				Text("\(card.number)")
					.font(.system(size: 36, weight: .bold))
					.foregroundColor(.primary)
			}

			Spacer()
		}
		.frame(maxWidth: .infinity, alignment: .leading)
		.frame(height: 100)
		.padding(.horizontal, 20)
		.background(
			RoundedRectangle(cornerRadius: 20)
				.fill(Color(.systemBackground))
				.shadow(color: Color.black.opacity(0.08), radius: 12, x: 0, y: 4)
		)
		.overlay(
			RoundedRectangle(cornerRadius: 20)
				.stroke(Color(.systemGray5), lineWidth: 1)
		)
	}
}
