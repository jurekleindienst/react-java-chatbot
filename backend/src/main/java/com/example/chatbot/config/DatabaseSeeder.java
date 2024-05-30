package com.example.chatbot.config;

import com.example.chatbot.model.Answer;
import com.example.chatbot.model.Category;
import com.example.chatbot.model.Question;
import com.example.chatbot.repository.AnswerRepository;
import com.example.chatbot.repository.CategoryRepository;
import com.example.chatbot.repository.QuestionRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {
    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public DatabaseSeeder(CategoryRepository categoryRepository, QuestionRepository questionRepository, AnswerRepository answerRepository) {
        this.categoryRepository = categoryRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    private static final String[] CATEGORIES = {
            "Booking Your Stay",
            "Policies & Guidelines",
            "Campsite Features & Services",
            "Health & Safety",
            "Explore the Area"
    };
    private static final String[] BOOKING_QUESTIONS = {
            "Camp Open Dates",
            "Booking Requirement",
            "Booking Process",
            "1 Night Stay",
            "Without Credit/Prepaid Card",
            "Phone Reservation",
            "Specific Pitch Number Reservation",
            "Shaded/Larger Pitch Reservation",
            "Booking Change",
            "Booking Confirmation Issue"
    };
    private static final String[] BOOKING_ANSWERS = {
            "We're open from March 30 to October 13, 2024. Do note, we're closed during the chilly winter months!",
            "Booking isn't a must in the quieter times (April 1 to June 30 and August 28 to October 1), but we do recommend it for the high season in July and August.",
            "Booking is a breeze through our online system. Just make sure you have a credit or prepaid card handy.",
            "Looking for just a night? While we don't book these online, you can pick a spot in our Free Zone when you arrive.",
            "No card? No problem! Just drop us an email, and we'll sort out a bank transfer for you. We'll need an 80% advance payment to secure your booking.",
            "We keep things digital here, so all bookings are through our online system or via email.",
            "We can't promise specific pitch numbers, but we'll do our best to meet your preferences if they're available.",
            "Dreaming of a specific pitch? Let us know in your booking note, and we'll see what we can do!",
            "Plans changed? No worries. You can tweak your booking free of charge up to 7 days before your arrival.",
            "Didn't get your confirmation email? Check your spam folder, and if it's still missing, just give us a shout."
    };
    private static final String[] POLICIES_QUESTIONS = {
            "Cancellation Policy for Pitches",
            "Cancellation Policy for Bungalows, Tents, Apartments",
            "Cancellation Due to Force Majeure",
            "Check-In/Out Times",
            "Check-In Requirements"
    };
    private static final String[] POLICIES_ANSWERS = {
            "Our cancellation terms vary depending on when you cancel. Check out our detailed policy for specifics.",
            "Each accommodation type has its own set of cancellation rules, including prepayment details.",
            "Got an emergency? We understand. Cancel a day before by 15:00 with the right documents, and we've got you covered.",
            "Our check-in and check-out times vary by accommodation type. Remember, late departures might be charged as an extra day.",
            "Just bring along everyone's ID and your vehicle registration number when you check in."
    };
    private static final String[] CAMPSITE_QUESTIONS = {
            "Pitch Change",
            "Camping Card Discounts",
            "Free Camping Spot",
            "Campsite Entry/Exit",
            "Motorhome Service Station",
            "Pet Policy",
            "WiFi Availability",
            "Drinking Water",
            "Campfires",
            "Fridge Rental",
            "Swimming",
            "Electrical Boxes",
            "Turtle at Reception",
            "Day Visitor Access",
            "Sports Activities"
    };
    private static final String[] CAMPSITE_ANSWERS = {
            "Not loving your pitch? We'll happily swap it if there's another available.",
            "Member of a camping club? Show us your card for some sweet discounts.",
            "Our Free Zone is always open for walk-ins, especially during the high season.",
            "Coming and going is easy-peasy from 08:00 to 23:00. Early birds can check out from 06:00 with advance payment.",
            "Need to service your motorhome? We've got a spot just outside the camp near the tennis courts.",
            "Your furry friends are welcome here! Just keep them on a leash and tidy up after them.",
            "Stay connected with our campsite WiFi. You'll get the password when you check in.",
            "Thirsty? Our tap water is crystal clear and totally drinkable.",
            "While ground fires are a no-go, feel free to barbecue away safely.",
            "No fridges for rent, but we've got cool lockers you can use.",
            "Dive into our lake or river! Just remember, dogs can only swim in designated areas.",
            "Our electrical boxes are 16 amperes, 220V. Don't forget your Europlug or CEE plug!",
            "Meet Tomi, our resident turtle since 2000. He's a bit of a loner but a total charmer.",
            "Just visiting for the day? We've got you covered with lots of info on our subpage.",
            "Feeling active? We offer tennis, mini golf, bike hire, and even more thrilling activities like rafting!",

    };
    private static final String[] HEALTH_QUESTIONS = {
            "Medical Emergencies"
    };
    private static final String[] HEALTH_ANSWERS = {
            "In case of a health hiccup, our staff are trained in first aid, and there's a health center nearby for anything serious."
    };
    private static final String[] EXPLORE_QUESTIONS = {
            "Important Phone Numbers",
            "Public Transport",
            "Distance to Bled",
            "Nearest Store",
            "Trip Recommendations",
            "Weather in Slovenia",
            "Activities in Rain"
    };
    private static final String[] EXPLORE_ANSWERS = {
            "Need help? We've listed all the essential numbers for your peace of mind.",
            "The nearest bus and train stations are in Lesce, just a hop away.",
            "Fancy a trip to Bled? It's just 4 km away - perfect for a nice walk, a quick bike ride, or a scenic bus journey during the high season.",
            "You'll find a store right at our campsite. For more variety, Lesce is just 2 km away with plenty of supermarkets.",
            "Looking for adventure? We've got loads of ideas for trips, from relaxed strolls to more challenging treks.",
            "Expect a range from sunny and warm (25-35°C) to snowy winters. April and November might bring some rain, but there's still plenty to enjoy.",
            "Don't let the rain dampen your spirits! We recommend exploring local caves, museums, or enjoying a dip in indoor pools."
    };

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        // Check if categories have already been populated
        if (categoryRepository.count() == 0) {
            List<Category> categoryList = new ArrayList<>();
            for (String name : CATEGORIES) {
                Category category = new Category();
                category.setCategory(name);
                categoryList.add(category);
            }
            categoryRepository.saveAll(categoryList);
        }

        // Check if questions have already been populated
        if (questionRepository.count() == 0) {
            Category BOOKING_CATEGORY = categoryRepository.findByCategory("Booking Your Stay");
            Category POLICIES_CATEGORY = categoryRepository.findByCategory("Policies & Guidelines");
            Category CAMPSITE_CATEGORY = categoryRepository.findByCategory("Campsite Features & Services");
            Category HEALTH_CATEGORY = categoryRepository.findByCategory("Health & Safety");
            Category EXPLORE_CATEGORY = categoryRepository.findByCategory("Explore the Area");

            List<Answer> allAnswers = new ArrayList<>();

            // Save Questions & Answers for "Booking Your Stay"
            for (int i = 0; i < BOOKING_QUESTIONS.length; i++) {
                Question question = new Question();
                question.setQuestion(BOOKING_QUESTIONS[i]);
                question.setCategory(BOOKING_CATEGORY);
                question = questionRepository.save(question);

                Answer answer = new Answer();
                answer.setQuestion(question);
                answer.setAnswer(BOOKING_ANSWERS[i]);
                allAnswers.add(answer);
            }

            // Save Questions & Answers for "Policies & Guidelines"
            for (int i = 0; i < POLICIES_QUESTIONS.length; i++) {
                Question question = new Question();
                question.setQuestion(POLICIES_QUESTIONS[i]);
                question.setCategory(POLICIES_CATEGORY);
                question = questionRepository.save(question);

                Answer answer = new Answer();
                answer.setQuestion(question);
                answer.setAnswer(POLICIES_ANSWERS[i]);
                allAnswers.add(answer);
            }

            // Save Questions & Answers for "Campsite Features & Services"
            for (int i = 0; i < CAMPSITE_QUESTIONS.length; i++) {
                Question question = new Question();
                question.setQuestion(CAMPSITE_QUESTIONS[i]);
                question.setCategory(CAMPSITE_CATEGORY);
                question = questionRepository.save(question);

                Answer answer = new Answer();
                answer.setQuestion(question);
                answer.setAnswer(CAMPSITE_ANSWERS[i]);
                allAnswers.add(answer);
            }

            // Save Questions & Answers for "Health & Safety"
            for (int i = 0; i < HEALTH_QUESTIONS.length; i++) {
                Question question = new Question();
                question.setQuestion(HEALTH_QUESTIONS[i]);
                question.setCategory(HEALTH_CATEGORY);
                question = questionRepository.save(question);

                Answer answer = new Answer();
                answer.setQuestion(question);
                answer.setAnswer(HEALTH_ANSWERS[i]);
                allAnswers.add(answer);
            }

            // Save Questions & Answers for "Explore the Area"
            for (int i = 0; i < EXPLORE_QUESTIONS.length; i++) {
                Question question = new Question();
                question.setQuestion(EXPLORE_QUESTIONS[i]);
                question.setCategory(EXPLORE_CATEGORY);
                question = questionRepository.save(question);

                Answer answer = new Answer();
                answer.setQuestion(question);
                answer.setAnswer(EXPLORE_ANSWERS[i]);
                allAnswers.add(answer);
            }

            answerRepository.saveAll(allAnswers);
        }
    }
}
