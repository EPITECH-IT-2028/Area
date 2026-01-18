//
//  AREACardView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 18/01/2026.
//

import SwiftUI

struct AREACardView: View {
	let area: AREAItem

	var body: some View {
		VStack(alignment: .leading, spacing: 16) {
			HStack(alignment: .top, spacing: 12) {
				VStack(alignment: .leading, spacing: 4) {
					Text(area.title)
						.font(.title3)
						.fontWeight(.semibold)
						.lineLimit(2)

					HStack(spacing: 4) {
						Text(area.actionServiceName)
							.font(.subheadline)
							.foregroundColor(.secondary)

						Image(systemName: "arrow.right")
							.font(.caption)
							.foregroundColor(.secondary)

						Text(area.reactionServiceName)
							.font(.subheadline)
							.foregroundColor(.secondary)
					}
				}

				Spacer()

				if area.isActive == true {
					Text(LocalizedStringResource.homeCardActive)
						.font(.caption)
						.fontWeight(.semibold)
						.foregroundColor(.green)
						.padding(.horizontal, 12)
						.padding(.vertical, 6)
						.background(Color.green.opacity(0.15))
						.cornerRadius(8)
				} else if area.isActive == false {
					Text(LocalizedStringResource.homeCardInactive)
						.font(.caption)
						.fontWeight(.semibold)
						.foregroundColor(.red)
						.padding(.horizontal, 12)
						.padding(.vertical, 6)
						.background(Color.red.opacity(0.15))
						.cornerRadius(8)
				}
			}

			HStack(spacing: 12) {
				VStack(alignment: .leading, spacing: 6) {
					HStack(spacing: 4) {
						Image(systemName: "play.fill")
							.font(.caption2)
							.foregroundColor(.blue)

						Text(LocalizedStringResource.homeCardAction)
							.font(.caption)
							.fontWeight(.semibold)
							.foregroundColor(.blue)
					}

					Text(area.actionServiceName)
						.font(.body)
						.fontWeight(.medium)

					Text(area.actionEventType ?? "")
						.font(.caption)
						.foregroundColor(.secondary)
						.lineLimit(1)
				}
				.frame(maxWidth: .infinity, alignment: .leading)

				Image(systemName: "arrow.right")
					.font(.body)
					.foregroundColor(.secondary)
					.padding(.horizontal, 4)

				VStack(alignment: .leading, spacing: 6) {
					HStack(spacing: 4) {
						Text(LocalizedStringResource.homeCardReaction)
							.font(.caption)
							.fontWeight(.semibold)
							.foregroundColor(.purple)

						Image(systemName: "bolt.fill")
							.font(.caption2)
							.foregroundColor(.purple)
					}

					Text(area.reactionServiceName)
						.font(.body)
						.fontWeight(.medium)

					Text(area.reactionEventType ?? "")
						.font(.caption)
						.foregroundColor(.secondary)
						.lineLimit(1)
				}
				.frame(maxWidth: .infinity, alignment: .leading)
			}
			.padding(16)
			.background(Color.backgroundColor)
			.cornerRadius(12)
		}
		.padding(16)
		.background(Color.cardBackgroundColor)
		.cornerRadius(20)
		.overlay(
			RoundedRectangle(cornerRadius: 20)
				.stroke(Color.black.opacity(0.1), lineWidth: 1)
		)
		.shadow(color: Color.black.opacity(0.05), radius: 8, x: 0, y: 2)
	}
}
