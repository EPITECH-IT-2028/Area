//
//  ExpandingCardView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 11/12/2025.
//

import SDWebImageSwiftUI
import SwiftUI

struct TableView: View {
	var item: CardItem

	var body: some View {
		HStack(alignment: .center, spacing: 0) {
			if item.iconURL != nil {
				WebImage(url: item.iconURL)
					.resizable()
					.indicator(.activity)
					.transition(.fade(duration: 0.5))
					.scaledToFit()
					.padding(10)
					.frame(width: 75, height: 75)
					.clipped()
			}

			VStack(alignment: .center) {
				Text(item.title)
					.font(.system(size: 24, weight: .bold))
					.foregroundStyle(.black)
					.multilineTextAlignment(.center)

				if item.description != nil {
					Text(item.description!)
							.font(.body)
							.foregroundStyle(.gray)
							.lineLimit(2)
							.multilineTextAlignment(.center)
				}
			}
			.padding(.top, 10)
			.frame(maxWidth: .infinity)
		}
		.frame(maxWidth: .infinity)
		.frame(height: 100)
		.background(Color.white)
		.cornerRadius(20)
		.overlay(
			RoundedRectangle(cornerRadius: 20).stroke(
				Color.black.opacity(0.2),
				lineWidth: 1
			)
		)
	}
}
